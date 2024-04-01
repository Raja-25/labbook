'use strict';

function PizzaException(msg) {
    this.message = msg;
    console.log("Error Message: " + this.message);
}


class Pizza {
    constructor(size, type) {
        if (!size || !type) {
            throw new PizzaException('Required two arguments, given: ' + arguments.length);
        }

        if (!Pizza.allowedSizes.includes(size) || !Pizza.allowedTypes.includes(type)) {
            throw new PizzaException('Invalid type');
        }

        this.size = size;
        this.type = type;
        this.extraIngredients = [];
    }

    static SIZE_S = 'S';
    static SIZE_M = 'M';
    static SIZE_L = 'L';

    static TYPE_VEGGIE = 'VEGGIE';
    static TYPE_MARGHERITA = 'MARGHERITA';
    static TYPE_PEPPERONI = 'PEPPERONI';

    static EXTRA_TOMATOES = 'TOMATOES';
    static EXTRA_CHEESE = 'CHEESE';
    static EXTRA_MEAT = 'MEAT';

    static allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
    static allowedTypes = [Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI, Pizza.TYPE_VEGGIE];
    static allowedExtraIngredients = [Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT, Pizza.EXTRA_TOMATOES];


    addExtraIngredient(ingredient) {
        if (!Pizza.allowedExtraIngredients.includes(ingredient)) {
            throw new PizzaException('Invalid ingredient');
        }
    
        if (this.extraIngredients.includes(ingredient)) {
            throw new PizzaException('Duplicate ingredient');
        }
    
        this.extraIngredients.push(ingredient);
    }
    

    removeExtraIngredient(ingredient) {
        let index = this.extraIngredients.indexOf(ingredient);

        if (!Pizza.allowedExtraIngredients.includes(ingredient) || index === -1) {
            throw new PizzaException('Invalid ingredient');
        }

        this.extraIngredients.splice(index, 1);
    }

    getSize() {
        return this.size;
    }


    getPrice() {
        let basePrice = 0;

        switch (this.size) {
            case 'S':
                basePrice += 25;
                break;
            case 'M':
                basePrice += 35;
                break;
            case 'L':
                basePrice += 50;
                break;
        }

        switch (this.type) {
            case 'VEGGIE':
                basePrice += 25;
                break;
            case 'MARGHERITA':
                basePrice += 30;
                break;
            case 'PEPPERONI':
                basePrice += 35;
                break;
        }

        for (const ingredient of this.extraIngredients) {
            switch (ingredient) {
                case 'TOMATOES':
                    basePrice += 3;
                    break;
                case 'CHEESE':
                    basePrice += 4;
                    break;
                case 'MEAT':
                    basePrice += 5;
                    break;
            }
        }

        return basePrice;
    }


    getPizzaInfo() {
        let ingredientsString = this.extraIngredients.join(',');

        return `Size: ${this.size}, type: ${this.type}; extra ingredients: ${ingredientsString}; price: ${this.getPrice()} `;
    }
}

try {
    let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
    pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
    console.log(`Price: ${pizza.getPrice()} `);

    pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
    pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
    console.log(`Price with extra ingredients: ${pizza.getPrice()} `);

    console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`);

    pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
    console.log(`Extra ingredients: ${pizza.extraIngredients.length}`);
    console.log(pizza.getPizzaInfo());
     let pizza1 = new Pizza(Pizza.SIZE_S);
      // => Invalid pizza parameters
      //pizza.addExtraIngredient('game');
} catch (e) {
    if (e instanceof PizzaException) {
        console.error(`Pizza Exception: ${e.message}`);
    } else {
        console.error(`Unexpected error: ${e.message}`);
    }
}

// Examples of errors

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid pizza parameters

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Invalid or duplicate ingredient

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Invalid or not added ingredient
