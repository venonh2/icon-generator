import Image from "next/image";

interface IProps {
  link: string;
  description: string;
}

export function Preview({ link, description }: IProps) {
  return (
    <div className="flex flex-col">
      <Image alt={description} src={link} width={500} height={500} />
    </div>
  );
}
