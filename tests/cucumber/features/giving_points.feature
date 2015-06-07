Feature: Scientist score can be increased manually

  As member of a hypothetical science jury
  I want to give scientists points
  So that I can express my appreciation

  Background:
    Given I am viewing the leaderboard example
    And the scientists have the following scores:
    | name                 | score |
    | Claude Shannon       | 25    |
    | Nikola Tesla         | 20    |
    | Carl Friedrich Gauss | 15    |
    | Marie Curie          | 10    |
    | Grace Hopper         | 5     |
    | Ada Lovelace         | 0     |

  @dev
  Scenario: Give 5 points to a scientist
    When I give "Grace Hopper" 5 points
    Then "Grace Hopper" should have a score of 10
    And "Grace Hopper" should be above "Marie Curie"
