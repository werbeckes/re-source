class CategoriesController < ApplicationController
  respond_to :json
  def index
    @categories = Journey.find_by(id: params[:journey_id]).categories
    render json: @categories.to_a
  end
end
