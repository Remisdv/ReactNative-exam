import { NativeTabs } from "expo-router/native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="recettes">
        <NativeTabs.Trigger.Label>Recettes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="restaurant" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favoris">
        <NativeTabs.Trigger.Icon sf="heart" md="favorite" />
        <NativeTabs.Trigger.Label>Favoris</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="courses">
        <NativeTabs.Trigger.Icon sf="cart" md="shopping_cart" />
        <NativeTabs.Trigger.Label>Mes Courses</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
