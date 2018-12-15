import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from '../../../node_modules/@types/q';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }


  private cargarProductos() {

    return new Promise(  ( resolve, reject ) => {

      this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
                //console.log(resp);
            this.productos = resp;
            this.cargando = false;
            resolve();
          });

    });

  }
//Esta funcion es para obtener los id de los productos
//`: en vez de comillas se colocan estos que nos permiten hacer inserciones de pedazos de string({ id })
  getProducto( id: string ) {

    return this.http.get(`https://angular-html-25cf9.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino: string ) {


    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }


  }

  private filtrarProductos( termino: string ) {

   //console.log(this.productos);
   //Purgar el arreglo(para que los productos no salgan dos veces)
    // console.log(this.productos);
    this.productosFiltrado = [];
    //esto es para tomar las letras del buscador en minuscula siempre
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      //El condicioonal es para buscar los productos por categorias o por titulo
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ) {
        this.productosFiltrado.push( prod );
      }

    });


  }

}
