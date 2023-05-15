import { useTranslation } from "~/hooks/useTranslation";
import type { MainWeaponId } from "~/modules/in-game-lists";
import { mainWeaponImageUrl, outlinedMainWeaponImageUrl } from "~/utils/urls";

interface ImageProps {
  path: string;
  alt: string;
  title?: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  testId?: string;
  onClick?: () => void;
}

export function Image({
  path,
  alt,
  title,
  className,
  width,
  height,
  style,
  testId,
  containerClassName,
  onClick,
}: ImageProps) {
  return (
    <picture title={title} className={containerClassName} onClick={onClick}>
      <source
        type="image/avif"
        srcSet={`${path}.avif`}
        width={width}
        height={height}
        style={style}
      />
      <img
        alt={alt}
        src={`${path}.png`}
        className={className}
        width={width}
        height={height}
        style={style}
        draggable="false"
        data-testid={testId}
      />
    </picture>
  );
}

type WeaponImageProps = {
  weaponSplId: MainWeaponId;
  variant: "badge" | "build";
} & Omit<ImageProps, "path" | "alt" | "title">;

export function WeaponImage({
  weaponSplId,
  variant,
  testId,
  ...rest
}: WeaponImageProps) {
  const { t } = useTranslation(["weapons"]);

  return (
    <Image
      {...rest}
      alt={t(`weapons:MAIN_${weaponSplId}`)}
      title={t(`weapons:MAIN_${weaponSplId}`)}
      testId={testId}
      path={
        variant === "badge"
          ? outlinedMainWeaponImageUrl(weaponSplId)
          : mainWeaponImageUrl(weaponSplId)
      }
    />
  );
}
