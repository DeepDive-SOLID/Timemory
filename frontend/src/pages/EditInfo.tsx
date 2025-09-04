import { useEffect, useRef, useState, useContext } from "react";
import styles from "../styles/EditInfo.module.scss";
import { profile_cloud, camera } from "../assets";
import TabBar from "../components/APP/TabBar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getMemberDto,
  updateMemberDto,
  deleteMemberDto,
} from "../api/mypageApi";
import type { MypageDto, MypageUpdDto } from "../types/mypage";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = /^(01[0-9])[-]?\d{3,4}[-]?\d{4}$/;

const schema = z.object({
  memberName: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
  memberEmail: z.string().email("올바른 이메일 형식이 아닙니다."),
  memberPhone: z
    .string()
    .regex(
      phoneRegex,
      "휴대폰 번호 형식이 올바르지 않습니다. 예) 010-1234-5678"
    ),
  memberBirth: z.string().min(1, "생년월일을 선택하세요."),
  memberProfile: z
    .any()
    .refine(
      (file: File | null | undefined) => !file || file.size <= 10 * 1024 * 1024,
      "프로필 이미지는 10MB 이하만 업로드 가능합니다."
    )
    .refine(
      (file: File | null | undefined) =>
        !file ||
        ["image/png", "image/jpeg", "image/webp", "image/jpg"].includes(
          file.type
        ),
      "PNG, JPG, WEBP 형식만 허용됩니다."
    )
    .nullable()
    .optional(),
});

type FormValues = z.infer<typeof schema>;

const EditInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { initial?: MypageDto | null } };
  const { userInfo, logout } = useContext(AuthContext)!;

  const memberId = userInfo?.memberId ?? "";
  const [initial, setInitial] = useState<MypageDto | null>(
    state?.initial ?? null
  );
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string>(profile_cloud);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      memberName: "",
      memberEmail: "",
      memberPhone: "",
      memberBirth: "",
      memberProfile: null,
    },
    mode: "onChange",
  });

  const watchedFile = watch("memberProfile");
  useEffect(() => {
    if (watchedFile instanceof File) {
      const url = URL.createObjectURL(watchedFile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedFile]);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const base =
          initial ?? (memberId ? await getMemberDto(memberId) : null);
        if (!mounted) return;

        if (!initial && base) setInitial(base);
        reset({
          memberName: base?.memberName ?? "",
          memberEmail: base?.memberEmail ?? "",
          memberPhone: base?.memberPhone ?? "",
          memberBirth: (base?.memberBirth ?? "").slice(0, 10),
          memberProfile: null,
        });
        setPreview(base?.memberImg?.trim() ? base.memberImg : profile_cloud);
      } catch (e) {
        alert("회원 정보를 불러오지 못했어요.");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, [memberId, initial, reset]);

  const onPickImage = () => fileInputRef.current?.click();

  const onSubmit = async (values: FormValues) => {
    if (!memberId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const dto: MypageUpdDto = {
      memberId,
      memberName: values.memberName.trim(),
      memberEmail: values.memberEmail.trim(),
      memberPhone: values.memberPhone.trim(),
      memberBirth: values.memberBirth,
      memberProfile:
        values.memberProfile instanceof File ? values.memberProfile : null,
    };

    try {
      const msg = await updateMemberDto(dto);
      alert(msg || "저장되었습니다.");
      navigate("/mypage", { replace: true });
    } catch (e) {
      console.error(e);
      alert("저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  const onDelete = async () => {
    if (!memberId) return alert("로그인이 필요합니다.");
    if (!confirm("정말 회원을 탈퇴하시겠습니까? (되돌릴 수 없습니다)")) return;
    try {
      const msg = await deleteMemberDto(memberId);
      alert(msg || "회원 탈퇴가 완료되었습니다.");
      await logout();
    } catch (e) {
      console.error(e);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className={styles.pageSkeleton}>
        <p className={styles.header}>MY PAGE</p>
        <div className={styles.profile}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonTextSm} />
        </div>
        <div className={styles.formSkeleton}>
          {[...Array(4)].map((_, i) => (
            <div className={styles.skeletonRow} key={i} />
          ))}
        </div>
        <TabBar />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <p className={styles.header}>MY PAGE</p>

          <div className={styles.profile}>
            <div className={styles.imgWrapper} onClick={onPickImage}>
              <img
                src={preview || profile_cloud}
                alt="profile"
                className={styles.profileImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = profile_cloud;
                }}
              />
              <img src={camera} alt="camera" className={styles.camera} />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setValue("memberProfile", f, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
            <p className={styles.nickname}>
              {initial?.memberNickname ?? "닉네임"}
            </p>
            {errors.memberProfile?.message && (
              <p className={styles.error}>
                {String(errors.memberProfile.message)}
              </p>
            )}
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="memberName">
                NAME
              </label>
              <input
                id="memberName"
                className={styles.input}
                {...register("memberName")}
                placeholder="이름"
              />
              {errors.memberName?.message && (
                <p className={styles.error}>
                  {String(errors.memberName.message)}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="memberEmail">
                EMAIL
              </label>
              <input
                id="memberEmail"
                className={styles.input}
                type="email"
                {...register("memberEmail")}
                placeholder="example@email.com"
              />
              {errors.memberEmail?.message && (
                <p className={styles.error}>
                  {String(errors.memberEmail.message)}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="memberPhone">
                PHONE
              </label>
              <input
                id="memberPhone"
                className={styles.input}
                {...register("memberPhone")}
                placeholder="010-1234-5678"
              />
              {errors.memberPhone?.message && (
                <p className={styles.error}>
                  {String(errors.memberPhone.message)}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="memberBirth">
                BIRTH
              </label>
              <input
                id="memberBirth"
                className={styles.input}
                type="date"
                {...register("memberBirth")}
              />
              {errors.memberBirth?.message && (
                <p className={styles.error}>
                  {String(errors.memberBirth.message)}
                </p>
              )}
            </div>

            <button
              className={styles.saveButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "저장하기"}
            </button>
          </form>

          <div className={styles.actions}>
            <button className={styles.logoutButton} onClick={logout}>
              로그아웃
            </button>
            <button className={styles.deleteButton} onClick={onDelete}>
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
};

export default EditInfo;
