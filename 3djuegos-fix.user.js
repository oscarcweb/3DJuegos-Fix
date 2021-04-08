// ==UserScript==
// @name        3DJuegos Fix
// @namespace   3DJuegos Fix
// @match       *://*3djuegos.com/*
// @grant       none
// @icon        https://www.3djuegos.com/favicon_ios.png
// @version     1.01
// @homepageURL https://github.com/oscarcweb/3DJuegos-Fix
// @downloadURL	https://github.com/oscarcweb/3DJuegos-Fix/raw/main/3djuegos-fix.user.js
// @author      oscarcweb
// @description Remplaza el reproductor de video de 3DJuegos por el nativo de html5, además detiene las retrasmisiones en directo
// ==/UserScript==

function tresdjuegosfix_stream( time = 1000 ) {

	setTimeout(function(){
		if ( document.querySelectorAll("#directos_parrilla iframe") ) {
			document.querySelectorAll("#directos_parrilla iframe").forEach( v => {
				/** Guarda el código original, por si el usuario quiere cargar le directo */
				var stream = btoa(v.outerHTML);

				/** Remplaza el stream por un botón, al hacer click carga el directo */
				v.outerHTML = `<button style="margin:.7rem;font-size:14px;height:auto;font-weight: bold;background:#ED4000;color:white;padding: 3px 8px 3px;border: 1px solid #ED4000;border-radius:.3rem;" onclick="this.outerHTML = atob('`+stream+`');">Cargar directo</button>`;

				/** Muestra un mensaje */
				console.log("Live stream detected, closed!");
			});
		}
	}, time);

}

function tresdjuegosfix_player() {

	if ( document.querySelectorAll("figure#video_iframe") ) {
		document.querySelectorAll("figure#video_iframe").forEach( el => {
			/** Crea un objeto */
			var obj = JSON.parse(el.getAttribute("data-config"))

			/** Código de un video html5 */
			var video_html = `<video id="player" controls poster="`+obj.imagen+`"><source id="custom_quality" src="`+obj.url_vid+`" type="video/mp4"></video>`;

			/** Remplaza el código del video con el player por el de html5 */
			el.outerHTML = video_html;

			/** Muestra un mensaje */
			console.log( "HTML5 video player loaded!" );
		});
	}

}

window.onload = () => { tresdjuegosfix_stream( 500 ); tresdjuegosfix_player() }
window.onscroll = () => { tresdjuegosfix_player() };
