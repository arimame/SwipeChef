Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'tests#index'

  resource :tests, only: [:index]

  resources :users, only: [:create, :new, :show] do
    resource :fridge, only: [:create, :index, :destroy]
    resource :book, only: [:create, :index, :destroy]
  end

  resources :recipes, only: [:create, :new, :show, :index, :destroy]
end
