import { CATEGORY_OPTIONS } from "../../../../constants/Categories";
import useRoadmapStore from "../../../stores/useRoadmapStore";

const CategoryBar = () => {
  const { selectedCategory, setCategory } = useRoadmapStore();

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center mx-auto">
      {CATEGORY_OPTIONS.map((category) => {
        const isSelected = selectedCategory?.id === category.id;
        return (
          <button
            key={category.id}
            onClick={() => setCategory(category)}
            className={`
              px-6 py-2 cursor-pointer rounded-xl border text-sm font-medium transition-all duration-200
              ${
                isSelected
                  ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_16px_rgba(147,51,234,0.4)]"
                  : "bg-neutral-100 border-zinc-200 text-neutral-700 hover:border-purple-400 hover:text-purple-600 dark:bg-neutral-900 dark:border-neutral-600 dark:text-white dark:hover:border-purple-500"
              } 
            `}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBar;
