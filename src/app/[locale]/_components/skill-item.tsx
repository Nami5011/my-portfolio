export default function SkillItem({ isChrome }: { isChrome: boolean }) {
  return (
    <div
      className="w-15 h-15 rounded-[6px] p-px bg-[url(/images/skill_item_border2.svg)] bg-no-repeat bg-cover bg-center shadow-md"
      style={
        !isChrome
          ? {
              backgroundColor: 'white', // Fallback for non-Chrome browsers
            }
          : {}
      }
    >
      <div
        className="w-full h-full rounded-[5px] "
        style={{
          backdropFilter: 'url(#liquidGlassSquare)', // Only works in Chrome
        }}
      >
        <label></label>
      </div>
    </div>
  );
}
