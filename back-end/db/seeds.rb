# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])


puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

user1 = User.create!({username: "alissa",
  email: "alissa.balge@gmail.com",
  password: "1234",
  photo: "url",
  tagline: "cooking is fun"})

user2 = User.create!({username: "mark",
  email: "mark@mark.com",
  password: "1234",
  photo: "url",
  tagline: "let's get cooking!"})

user3 = User.create!({username: "connor",
  email: "connor@mark.com",
  password: "1234",
  photo: "url",
  tagline: "I <3 food"})

recipe1 = Recipe.create!({
  api_ref:"15-Minute-Pasta-2593803",
  name: "15-Minute Pasta",
  image: "http://lh6.ggpht.com/O2iSwES6w-WjKZrBTQTiaLhqdtvG88tffxrzbfkaQr99LZ71nC2VkavBoLe40aUt3LHOZvENw4VodLfSoBya=s1200-c"
})

recipe2 = Recipe.create!({
  api_ref: "Creamy-Cajun-Chicken-and-Sausage-Pasta-2472083",
  name: "Creamy Cajun Chicken and Sausage Pasta",
  image: "https://lh3.googleusercontent.com/mkctmh9Tf_4RlieigSjVdPgg_7rUQnaX14rT1rc9mSyLUgtC62e7PLJaZaJPEbDg0VNYSQ4zpZ5l_O3OZZZXBzU=s1200-c"
})

recipe3 = Recipe.create!({
  api_ref:"Pasta-caprese-299294",
  name: "Pasta Caprese",
  image: "https://lh3.googleusercontent.com/lvLrtXLoxRS_HVMK8TURN77Acf7AAdlRMXj8h_PXH4Ek8KKd_WmmX-8Nko5uagKRM4237KgtoBR5I-cDsDjA62g=s1200-c"
})

user2.books.create!({
  recipe_id: 1
})

user2.fridges.create!({
  recipe_id: 2
})
