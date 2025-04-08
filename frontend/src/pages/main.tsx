import { useNavigate } from "react-router";

export default function Main() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-6 w-full grid auto-rows-auto gap-y-9">
      <nav className="flex justify-between w-full my-6">
        <div className="font-black uppercase text-xl w-full">Bearpoint RECIPES</div>
        <div className="hidden md:block">
          <button className="bg-transparent border border-black rounded-md px-4 py-1" onClick={()=> navigate('login')}>login</button>
        </div>
      </nav>
      <section className="grid md:grid-cols-2 grid-cols-1 w-full gap-x-4">
        <div className="my-auto">
          <h1 className="cormorant-garamond-Header">Find Top-Rated Recipes Today</h1>
          <p className="mt-2 mb-9">Explore must-try recipes now! Discover favorites, share your culinary journey, and elevate your cooking experience effortlessly.</p>
        </div>
        <div>
          <div className="bg-[url(https://wkwjncnexncmhdsvvqii.supabase.co/storage/v1/object/public/recetario/project/dishSalad.jpg)] w-full h-[600px] bg-cover bg-center bg-no-repeat" />
        </div>
      </section>
      <section className="grid md:grid-cols-2 grid-cols-1 w-full gap-x-4 ">
        <div className="order-2 md:order-1">
          <div className="bg-[url(https://wkwjncnexncmhdsvvqii.supabase.co/storage/v1/object/public/recetario/project/shareDishes.jpg)] w-full h-[600px] bg-cover bg-center bg-no-repeat" />
        </div>
        <div className="my-auto md:ml-8 order-1 md::order-2 mt-6 md:mt-0">
          <h3 className="cormorant-garamond-Header">Discover, Save, and Share Delicious Recipes Bearpoint Recipes</h3>
          <p className="mt-2 mb-9 ">At Bearpoint Recipes, nestled in the vibrant city of Monterrey, we craft a seamless and delightful experience for food enthusiasts. Our modern mobile app is designed to help you discover an array of mouth-watering recipes. With features like personalized user profiles, advanced search filters, and a simple upload form, it's never been easier to save your favorites or share your culinary creations with others. Join us in celebrating the art of cooking with our clean, warm style and high-quality food photographs.</p>
        </div>
      </section>

      <footer className="h-24"></footer>
    </div>

  )
}