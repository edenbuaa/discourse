import {
  acceptance,
  query,
  queryAll,
} from "discourse/tests/helpers/qunit-helpers";
import { click, visit } from "@ember/test-helpers";
import { test } from "qunit";
import I18n from "I18n";

acceptance("Admin - Silence User", function (needs) {
  needs.user();

  test("silence a user - timeframe options", async function (assert) {
    await visit("/admin/users/1234/regular");
    await click(".silence-user");
    await click(".future-date-input-selector-header");

    assert.equal(
      query(".future-date-input-selector-header").getAttribute("aria-expanded"),
      "true",
      "Selector is expanded"
    );

    const options = Array.from(
      queryAll(`ul.select-kit-collection li span.name`).map((_, x) =>
        x.innerText.trim()
      )
    );

    const expected = [
      I18n.t("topic.auto_update_input.tomorrow"),
      I18n.t("topic.auto_update_input.next_week"),
      I18n.t("topic.auto_update_input.two_weeks"),
      I18n.t("topic.auto_update_input.next_month"),
      I18n.t("topic.auto_update_input.two_months"),
      I18n.t("topic.auto_update_input.three_months"),
      I18n.t("topic.auto_update_input.four_months"),
      I18n.t("topic.auto_update_input.six_months"),
      I18n.t("topic.auto_update_input.one_year"),
      I18n.t("topic.auto_update_input.forever"),
      I18n.t("topic.auto_update_input.pick_date_and_time"),
    ];

    assert.deepEqual(options, expected);
  });
});
