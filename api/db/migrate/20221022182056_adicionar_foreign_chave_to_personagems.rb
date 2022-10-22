class AdicionarForeignChaveToPersonagems < ActiveRecord::Migration[7.0]
  def change
    add_reference :personagems, :classe, foreign_key: { to_table: :classes }
  end
end
