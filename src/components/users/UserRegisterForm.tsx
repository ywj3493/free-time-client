import { useForm } from "react-hook-form";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";

interface UserRegisterFormProps {
  onSubmit: (data: UserRegisterFormData) => void;
}

export function UserRegisterForm({ onSubmit }: UserRegisterFormProps) {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    watch,
  } = useForm<UserRegisterFormData>({
    defaultValues: {
      preferredNoticeChannel: "EMAIL",
    },
  });

  const currentPassword = watch("password");

  return (
    <form
      className="flex flex-col justify-center items-center w-64 gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        type="text"
        {...register("name", { required: true })}
        placeholder="이름"
        className="w-full text-sm"
        rightadornment={<span className="text-red-500">*</span>}
      />
      <TextField
        type="text"
        {...register("email", {
          required: {
            value: true,
            message: "이메일을 형식으로 입력해주세요.",
          },
          pattern: {
            value: /^\S+@\S+$/i,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
        placeholder="로그인 이메일"
        className="w-full text-sm"
        rightadornment={<span className="text-red-500">*</span>}
      />
      <TextField
        type="text"
        {...register("phone", {
          pattern: /^01[016789]\d{3,4}\d{4}$/,
          maxLength: 11,
        })}
        placeholder="연락처"
        className="w-full text-sm"
      />
      <TextField
        type="password"
        {...register("password", {
          required: true,
        })}
        placeholder="비밀번호"
        className="w-full text-sm"
      />
      <TextField
        type="password"
        {...register("passwordConfirm", {
          required: true,
          validate: (value) =>
            value === currentPassword || "비밀번호가 일치하지 않습니다.",
        })}
        placeholder="비밀번호 확인"
        className="w-full text-sm"
      />

      <div className="flex w-full items-center gap-4 rounded-lg border border-gray-300 p-2 text-sm justify-between">
        알림채널
        <div className="grid grid-flow-col gap-2">
          <input
            type="radio"
            value="EMAIL"
            {...register("preferredNoticeChannel", { required: true })}
          />
          이메일
          <input
            type="radio"
            value="SMS"
            {...register("preferredNoticeChannel", { required: true })}
          />
          SMS
        </div>
      </div>
      <Button disabled={!isValid}>회원가입</Button>
    </form>
  );
}
