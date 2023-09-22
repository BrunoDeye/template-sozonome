import { Button } from "../../ui/button";

type CounterProps = {
  quantity: number;
  handleValueChange: (id: number, targetValue: string) => void;
  handleDecrement: (id: number) => void;
  handleIncrement: (id: number) => void;
  id: number;
};

function Counter({
  quantity,
  handleValueChange,
  handleDecrement,
  handleIncrement,
  id,
}: CounterProps) {
  return (
    <div className="h-10 w-full sm:w-[7rem]">
      <div className="relative mt-0 flex h-10 flex-row rounded-lg bg-transparent">
        <Button
          onClick={() => handleDecrement(id)}
          className="h-full w-[0.05rem] rounded-l rounded-r-none font-semibold"
          variant="gradientBlue"
          disabled={quantity === 1}
        >
          <span className="text-2xl -mt-2 font-thin leading-5">−</span>
        </Button>
        <input
          type="number"
          className="remove-arrow p-0 text-[11px] md:text-basecursor-default flex sm:text-md !min-w-[1.6rem] sm:!min-w-[2.5rem] w-full items-center border-none text-center font-semibold outline-none outline-none focus:text-black focus:outline-none focus:ring-sky-200 bg-gradient-to-br from-gray-100 to-blue-200 dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-gray-200 dark:hover:to-blue-300 dark:hover:text-sky-600 font-semibold text-sky-600 hover:from-gray-200 hover:to-sky-400 hover:text-sky-700"
          value={
            String(quantity).length > 1 && String(quantity).startsWith('0')
              ? String(quantity || 1).replace(/^0+/, '0')
              : String(quantity || 1)
          }
          onChange={(e) => handleValueChange(id, e.target.value)}
          min="1"
        />
        <Button
          onClick={() => handleIncrement(id)}
          className="h-full w-[0.05rem] rounded-r rounded-l-none font-semibold"
          variant="gradientBlue"
        >
          <span className="text-xl -mt-1 font-thin leading-5">+</span>
        </Button>
      </div>
    </div>
  );
}

export default Counter;
