import {
  type Path,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

export function Input<T extends FieldValues>({
  label,
  name,
  register,
  ...rest
}: InputProps<T>) {
  return (
    <div className="flex flex-col">
      <label htmlFor="prompt">{label || ""}</label>
      <input
        type="text"
        {...register(name)}
        className="h-10 rounded px-2 py-2 focus:border-red-700"
        {...rest}
      />
    </div>
  );
}
