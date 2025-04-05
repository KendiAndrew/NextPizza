import {
  Container,
  Filters,
  ProductsGroupList,
  TopBar,
  Title,
} from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizza";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-8">
        <Title text="Всі піци" size="lg" className="font-extrabold pl-4" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
        className="pl-4"
      />
      <Container className="mt-10 pb-14 pl-4">
        <div className="flex gap-[20px] xl:gap-[60px]">
          {/* Фільтрація */}
          <div className="w-[300px] overflow-hidden absolute lg:relative lg:overflow-visible px-2 xl:relative">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товарів */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
