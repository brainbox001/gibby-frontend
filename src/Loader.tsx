function Loader({
  parentClass,
  animateClass,
  childClasses,
}: {
  animateClass? : string;
  childClasses: string;
  parentClass: string;
}) {
  return (
    <div
      className={`flex space-x-2 justify-center items-center ${parentClass}`}
    >
      <span className="sr-only">Loading...</span>
      <div
        className={`${
          !childClasses ? "h-0.5 w-0.5 bg-white" : childClasses
        } ${animateClass ? "animate-color-skip-1" : 'animate-bounce-high'} rounded-full [animation-delay:-0.3s]`}
      ></div>

      <div
        className={`${
          !childClasses ? "h-0.5 w-0.5 bg-white" : childClasses
        } ${animateClass ? "animate-color-skip-2" : 'animate-bounce-higher'} rounded-full [animation-delay:-0.3s]`}
      ></div>

      <div
        className={`${
          !childClasses ? "h-0.5 w-0.5 bg-white" : childClasses
        } ${animateClass ? "animate-color-skip-3" : 'animate-bounce-highest'} rounded-full [animation-delay:-0.3s]`}
      ></div>
    </div>
  );
}
export default Loader;
