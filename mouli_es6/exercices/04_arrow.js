
/**
 * Déclarer une fonction fléchée qui renvoi le a + 1
 * Le return est explicite
 * 
 * contrainte: 
 *   - le mot clée "function" est interdis
 */

let arrow1 = (a) => a + 1;

/**
 * Déclarer une fonction fléchée qui renvoi le a + 1
 * Le return est implicite
 * 
 * contrainte: 
 *   - le mot clée "function" est interdis
 *   - le mot clée "return" est interdis
 */

let arrow2 = (a) => a + 1;

module.exports = {arrow1, arrow2};