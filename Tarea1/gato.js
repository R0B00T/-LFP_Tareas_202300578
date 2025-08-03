class Gato {
  // de esta forma declaramos los tributos públicos
  nombre;
  raza;

  //Asi indicamos que es un atributo privado
  #edad;

  constructor(nombre, raza, edad) {
    this.nombre = nombre;
    this.raza = raza;
    this.#edad = edad;
  }


  maullar() {
    return `${this.nombre} dice: ¡Miau! Tiene ${this.#edad} años.`;
  }

  dormir = () => {
    console.log(`${this.nombre} está durmiendo... Zzz`);
  };
}


const gato1 = new Gato("Michi", "Siames", 2);
const gato2 = new Gato("Pelusa", "Persa", 4);

console.log(gato1.maullar());
gato1.dormir();

console.log(gato2.maullar());
gato2.dormir();
