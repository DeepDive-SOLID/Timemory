interface ImgProps {
  img: string;
  alt: string;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const HomeImg = ({ img, alt, className, onClick }: ImgProps) => {
  return (
    <div className={className}>
      <img src={img} alt={alt} onClick={onClick} />
    </div>
  );
};

export default HomeImg;
