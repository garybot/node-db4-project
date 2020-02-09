
exports.up = function(knex) {
  return (knex.schema
  	.createTable('recipes', tbl => {
	  	tbl.increments();
	  	tbl.string('recipe_name', 128).notNullable();
	}))
  	.createTable('units', tbl => {
  		tbl.increments();
  		tbl.string('unit_name', 128).notNullable();
  	})
  	.createTable('ingredients', tbl => {
  		tbl.increments();
  		tbl.string('ingredient_name', 128).notNullable();
  	})
  	.createTable("recipe_ingredients", tbl => {
  		tbl.integer('recipe_id')
  			.unsigned()
  			.notNullable()
  			.references('recipes.id')
  			.onDelete('CASCADE')
  			.onUpdate('CASCADE');
  		tbl.integer('ingredient_id')
  			.unsigned()
  			.notNullable()
  			.references('ingredients.id')
  			.onDelete('CASCADE')
  			.onUpdate('CASCADE');
  		tbl.integer('unit_id')
  			.notNullable()
  			.unsigned()
  			.references('units.id')
  			.onDelete('CASCADE')
  			.onUpdate('CASCADE');
  		tbl.float('quantity').notNullable();
  		tbl.primary(['recipe_id', 'ingredient_id']);
  	})
  	.createTable('steps', tbl => {
  		tbl.increments();
  		tbl.integer('recipe_id')
  			.unsigned()
  			.notNullable()
  			.references('recipes.id');
  		tbl.integer('step_number').notNullable();
  		tbl.string('instructions', 128).notNullable();
  	});
};

exports.down = function(knex) {
  return knex.schems
  	.dropTableIfExists('steps')
  	.dropTableIfExists('recipe_ingredients')
  	.dropTableIfExists('ingredients')
  	.dropTableIfExists('units')
  	.dropTableIfExists('recipes');
};
