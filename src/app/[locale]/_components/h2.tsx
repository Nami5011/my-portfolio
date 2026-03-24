export default function H2({ h2, description }: { h2: string; description: string }) {
  return (
    <>
      <h2 className="font-onest font-semibold text-[28px] md:text-4xl leading-none text-center mb-4">
        {h2}
      </h2>
      <p className="max-w-121 text-[16px] leading-[1.3] text-center mb-8 mx-auto">{description}</p>
    </>
  );
}
