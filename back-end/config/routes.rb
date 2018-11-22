Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'recipes#index'

  resource :tests, only: [:index]

  resources :users, only: [:create, :new, :show, :update] do
    resources :fridges, only: [:create, :index, :destroy]
    resources :books, only: [:create, :index, :destroy]
  end

  resources :recipes, only: [:create, :new, :show, :index, :destroy]
end
