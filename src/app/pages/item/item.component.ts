import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '../../../../node_modules/@angular/router';
import {ProductosService} from '../../services/productos.service';
import {ProductoDescripcion} from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  //producto: ProductoDescripcion;: Para empezar a personalizar los productos
  producto: ProductoDescripcion;
  id: string;


  constructor( private route: ActivatedRoute,
  				public productoService: ProductosService ) { }

  ngOnInit() {
//subscribe(): Esta pendiente a todos los cambios que sucedan en el parametro del url
  	this.route.params
  	.subscribe( parametros => {

  		//console.log(parametros['id']);

  		this.productoService.getProducto(parametros['id'])
  			.subscribe((producto :ProductoDescripcion) =>{
          this.id = parametros['id'];
          this.producto = producto;
  				//console.log(producto);

  			});

  	});
  }

}
