require 'rails_helper'

RSpec.describe Todo, type: :model do
  
  # テキストがあれば作成できる
  it "is valid with text" do
    todo = FactoryBot.create(:todo)
    expect(todo).to be_valid
  end

  # テキストがなければ作成できない
  it "is invalid without text" do
    todo = FactoryBot.build(:todo, :blank_text)
    todo.valid?
    expect(todo.errors[:text]).to include "can't be blank"
  end
end
