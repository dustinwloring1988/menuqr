import MenuLayout from "components/MenuLayout";

const MenuLayoutPage = () => (
  <div>
    <h1>My Menu</h1>
    <MenuLayout items={[
      { id: 1, label: 'Item 1', url: '#' },
      { id: 2, label: 'Item 2', url: '#' },
      // Add more menu items as needed
    ]} />
  </div>
);

export default MenuLayoutPage;