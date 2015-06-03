class CreateCachedUrl < ActiveRecord::Migration
  def change
    add_column :snippets, :cached_url, :string
  end
end
