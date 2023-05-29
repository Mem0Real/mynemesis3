import getAllCategories from "@/libraries/getAllCategories";
import { Suspense } from "react";
// import Parent from "./Parent";

export default async function Category() {
  const categoriesData = getAllCategories();
  const categories = await categoriesData;

  const content = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="flex flex-col items-start ps-2 text-md mb-1"
      >
        <details>
          <summary className="w-64 h-8 cursor-pointer py-6">
            {category.name}
          </summary>
          <div>
            {category.parents.map((parent) => {
              return (
                parent.CategoryId === category.id && (
                  <div
                    key={parent.id}
                    className="flex flex-col items-start ps-2 mb-1"
                  >
                    <details>
                      <summary className="w-64 h-8 cursor-pointer py-6">
                        {parent.name}
                      </summary>

                      <div>
                        {category.children.map((child) => {
                          return (
                            child.ParentId === parent.id && (
                              <div
                                key={child.id}
                                className="flex flex-col items-start ps-2 mb-1"
                              >
                                <details>
                                  <summary className="w-64 h-8 cursor-pointer py-6">
                                    {child.name}
                                  </summary>
                                  <div>
                                    {category.items.map((item) => {
                                      return (
                                        item.ChildId === child.id && (
                                          <div
                                            key={item.id}
                                            className="flex flex-col items-start ps-2 mb-1"
                                          >
                                            <div className="w-64 h-8 cursor-pointer py-6">
                                              {item.name}
                                            </div>
                                          </div>
                                        )
                                      );
                                    })}
                                  </div>
                                </details>
                              </div>
                            )
                          );
                        })}
                      </div>
                    </details>
                  </div>
                )
              );
            })}
          </div>
          {/* <div>
            <Suspense fallback={<h2>Loading...</h2>}>
              <Parent category={category.shortName} />
            </Suspense>
          </div> */}
        </details>
      </div>
    );
  });
  return content;
}
