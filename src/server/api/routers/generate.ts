import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
// https://slashimagine.pro/docs

/**
 * protected procedure apenas para usuarios logados.
 */

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// DALL_API_KEY
export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      //verifica se o usuario tem pontos para gerar imagens ainda.

      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      const response = await openai.createImage({
        prompt: input.prompt,
        n: 1,
        size: "1024x1024",
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Sem creditos disponiveis, por favor adquira mais",
        });
      }

      const image_url = response.data.data[0].url;

      return {
        data: image_url,
      };
    }),
});
