FactoryBot.define do
  factory :todo do
    text { "Do somethig" }

    trait :blank_text do
      text { "" }
    end
  end
end
