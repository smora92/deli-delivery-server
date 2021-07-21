const MenusService = {
    getAllMenus(knex) {
        return knex.select('*').from('menu')
    },

    insertMenu(knex, newMenu) {
        return knex
            .insert(newMenu)
            .into('restaurants')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex
            .from('restaurants')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteMenu(knex, id) {
        return knex('restaurants')
            .where({ id })
            .delete()
    },

    updateMenu(knex, id, newMenuFields) {
        return knex('restaurants')
            .where({ id })
            .update(newMenuFields)
    }
    // getByType(knex, item_type) {
    //     return knex()
    //         .from('menus')
    //         .select('*')
    //         .distinct('food', 'drinks')
    //         .where(categor)
    // }
}
module.exports = MenusService;
