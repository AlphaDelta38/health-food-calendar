import FlexBox from "@/shared/ui/flexbox";
import NewProductHeader from "./header";
import NewProductContent from "./content";


function NewProductPage() {
  return (
    <FlexBox width="100%" height="100%" flexDirection="column" padding="24px 16px">
      <NewProductHeader />
      <NewProductContent />
    </FlexBox>
  )
}

export default NewProductPage;