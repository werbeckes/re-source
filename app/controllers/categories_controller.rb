class CategoriesController < ApplicationController
  respond_to :json
  def index
    @categories = Journey.find_by(id: params[:journey_id]).categories
    render json: @categories.to_a
  end

  def show
    @category = Category.find(params[:id])
    render json: @category
  end

  def create
    @journey = Journey.find_by_id(params[:journey_id])
    @category = @journey.categories.new(category_params)
    if @category.save
      render json: @category
    else
      #TODO catch and return errors
    end
  end

  def destroy
    Category.find_by_id(params[:id]).destroy
    render json: " "
  end

  private
    def category_params
      params.require(:category).permit(:title, :description, :public_bool)
    end
end
