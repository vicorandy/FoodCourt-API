/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('addons', function (table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('price', 255).notNullable();
    table.string('description', 255).nullable();
    table.string('category', 255).nullable();
    table.string('brandId', 225).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('addons');
};
