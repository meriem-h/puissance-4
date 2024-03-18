
class plateau {
    constructor(selector) {
        this.colone = 7
        this.ligne = 6
        this.selector = selector
        this.nbr = []
        this.dernier_pos = []
        this.nombre = 0


        //creation du tableau de position en 2D
        this.position = new Array(this.colone)

        for (let index = 0; index < this.colone; index++) {
            this.position[index] = new Array()
            for (let i = 0; i < this.ligne; i++) {
                this.position[index][i] = 0
            }
        }
    }

    start() {
        $('#jeux').plugin()
    }

    plateau() {

        let $plateau_jeux = $(this.selector);


        // creation du plateau de jeux

        for (let col = 0; col < this.colone; col++) {
            this.nbr[col] = this.ligne - 1
            let $cellule_col = $("<div>").addClass("col")
            for (let length = 0; length < this.ligne; length++) {
                let $cellule_ligne = $("<div>").addClass("lgn")
                $cellule_col.append($cellule_ligne);
                // $cellule_ligne[0].setAttribute("id", length)     //pas sûr que tu en ai besoins
            }
            $plateau_jeux.append($cellule_col);
            $cellule_col[0].setAttribute("id", col)
        }

    };

    //le on click se declanche avec cette function 

    play(target) {


        let alignement = 0

        if (this.nbr[target.id] > -1) {
            if (this.nombre % 2 == 0) {
                target.children[this.nbr[target.id]].style.backgroundColor = "white"
                this.nbr[target.id]--
                let la = this.position[target.id].indexOf(0)
                this.dernier_pos.push(la)
                // console.log(index_pos)


                if (this.position[target.id][la] == 0) {
                    this.position[target.id][la] = "O"
                }

            }

            else {
                target.children[this.nbr[target.id]].style.backgroundColor = "green"
                this.nbr[target.id]--
                let val = "X"

                let la = this.position[target.id].indexOf(0)
                this.dernier_pos.push(la)

                if (this.position[target.id][la] == 0) {

                    this.position[target.id][la] = "X"
                }

            }
            this.nombre++

        }

    }

    player_1(target) {

        let taille = this.dernier_pos.length
        let last = this.dernier_pos[taille - 1]
        let vainqueur = []
        let increment = 0
        let droite = 0
        let droite_haut = 0
        let droite_bas = 0
        let gauche = 0
        let gauche_haut = 0
        let gauche_bas = 0

        if (this.position[target.id][last] == "O") {


            //         *--------------------------*
            //         |  verification en colone  |
            //         *--------------------------*


            for (let index = 0; index < this.ligne; index++) {

                if (this.position[target.id][last - index] == "O") {

                    increment++

                    if (increment >= 4) {
                        vainqueur.push("joeur 1")
                    }
                }
                else {
                    break
                }
            }

            //         *-------------------------*
            //         |  verification en ligne  |
            //         *-------------------------*


            for (let index = 0; index < this.colone; index++) {
                let trouve = false
                if (this.position[parseInt(target.id) + index] != undefined && this.position[parseInt(target.id) + index][last] == "O") {

                    droite++

                    if (droite >= 4) {
                        vainqueur.push("blanc")
                    }
                    trouve = true
                }

                if (this.position[parseInt(target.id) - index - 1] != undefined && this.position[parseInt(target.id) - index - 1][last] == "O") {

                    gauche++

                    if (gauche >= 4) {
                        vainqueur.push("blanc")
                    }
                }

                else if (gauche + droite >= 4) {
                    vainqueur.push("blanc")
                }

                else if (trouve == false) {
                    break
                }
            }

            //         *-----------------------------*
            //         |  verification en diagonale  |
            //         *-----------------------------*


            for (let index = 0; index < this.colone; index++) {
                let trouve = false

                // droite haut
                if (this.position[parseInt(target.id) + index] != undefined && this.position[parseInt(target.id) + index][last + index] == "O") {
                    droite_haut++
                    console.log("dh" + droite_haut)
                    if (droite_haut >= 4) {
                        vainqueur.push("joueur 1")
                    }
                    trouve = true
                }

                // droite bas
                if (this.position[parseInt(target.id) + index] != undefined && this.position[parseInt(target.id) + index][last - index] == "O") {
                    droite_bas++
                    console.log("db" + droite_bas)
                    if (droite_bas >= 4) {
                        vainqueur.push("joueur 1")
                    }
                    trouve = true
                }

                // // gauche haut
                if (this.position[parseInt(target.id) - index] != undefined && this.position[parseInt(target.id) - index][last + index] == "O") {

                    gauche_haut++
                    console.log("gh" + gauche_haut)
                    if (gauche >= 4) {
                        vainqueur.push("joueur 1")
                        console.log("gagner")
                    }
                    trouve = true
                }


                //gauche bas
                if (this.position[parseInt(target.id) - index] != undefined && this.position[parseInt(target.id) - index][last - index] == "O") {
                    gauche_bas++
                    console.log("gb" + gauche_bas)
                    if (gauche_bas >= 4) {
                        vainqueur.push("joueur 1")
                    }
                    trouve = true
                }


                else if (gauche_bas + droite_haut - 1 >= 4) {
                    vainqueur.push("blanc")
                }
                else if (gauche_haut + droite_bas - 1 >= 4) {
                    vainqueur.push("blanc")
                }

                else if (trouve == false) {
                    break
                }

            }
        }
        if (vainqueur.length != 0) {
            window.alert("bravo blanc a gagner")
        }
    }
    player_2(target) {

        let taille = this.dernier_pos.length
        let last = this.dernier_pos[taille - 1]
        let vainqueur = []
        let increment = 0
        let droite = 0
        let droite_haut = 0
        let droite_bas = 0
        let gauche = 0
        let gauche_haut = 0
        let gauche_bas = 0


        //         *--------------------------*
        //         |  verification en colone  |
        //         *--------------------------*


        if (this.position[target.id][last] == "X") {

            for (let index = 0; index < this.ligne; index++) {

                if (this.position[target.id][last - index] == "X") {

                    increment++

                    if (increment >= 4) {
                        vainqueur.push("joeur 2")
                    }
                }
                else {
                    break
                }
            }


            //         *-------------------------*
            //         |  verification en ligne  |
            //         *-------------------------*


            for (let index = 0; index < this.colone; index++) {
                let trouve = false
                if (this.position[parseInt(target.id) + index] != undefined && this.position[parseInt(target.id) + index][last] == "X") {

                    droite++

                    if (droite >= 4) {
                        vainqueur.push("joeur 2")
                    }
                    trouve = true
                }

                if (this.position[parseInt(target.id) - index - 1] != undefined && this.position[parseInt(target.id) - index - 1][last] == "X") {

                    gauche++

                    if (gauche >= 4) {
                        vainqueur.push("joeur 2")
                    }
                }

                else if (gauche + droite >= 4) {

                    vainqueur.push("joeur 2")
                }

                else if (trouve == false) {
                    break
                }
            }
        }
        
        
        //         *-----------------------------*
        //         |  verification en diagonale  |
        //         *-----------------------------*
        
        for (let index = 0; index < this.colone; index++) {
            let trouve = false
            
            // droite haut
            if (this.position[parseInt(target.id) + index] != undefined && this.position[parseInt(target.id) + index][last + index] == "X") {
                droite_haut++
                console.log("dh" + droite_haut)
                if (droite_haut >= 4) {
                    vainqueur.push("joueur 2")
                }
                trouve = true
            }
            
            // droite bas
            if (this.position[parseInt(target.id) + index] != undefined && this.position[parseInt(target.id) + index][last - index] == "X") {
                droite_bas++
                if (droite_bas >= 4) {
                    vainqueur.push("joueur 2")
                }
                trouve = true
            }
            
            // // gauche haut
            if (this.position[parseInt(target.id) - index] != undefined && this.position[parseInt(target.id) - index][last + index] == "X") {
                
                gauche_haut++
                if (gauche >= 4) {
                    vainqueur.push("joueur 2")
                    console.log("gagner")
                }
                trouve = true
            }
            
            
            //gauche bas
            if (this.position[parseInt(target.id) - index] != undefined && this.position[parseInt(target.id) - index][last - index] == "X") {
                gauche_bas++
                if (gauche_bas >= 4) {
                    vainqueur.push("joueur 2")
                }
                trouve = true
            }
            
            
            else if (gauche_bas + droite_haut - 1 >= 4) {
                vainqueur.push("vert")
            }
            else if (gauche_haut + droite_bas - 1 >= 4) {
                vainqueur.push("vert")
            }
            
            else if (trouve == false) {
                break
            }
        }
        if (vainqueur.length != 0) {
            window.alert("bravo vert a gagner")
        }
    }
    
    // coté style.css
    
    style() {
        
        $("*").css({
            "margin": "0",
            "padding": "0",
        })
        
        $("body").css({
            "text-align": "center",
            "background-color": "black",
        });
        

        // couleur du plateau

        $("#jeux").css({
            "display": "inline-block",
            "text-align": "center",
            "background-color": "coral",
        });

        $(".col").css({
            "display": "inline-block",
        });

        $(".lgn").css({
            "height": "100px",
            "width": "100px",
            "border-radius": "50%",
            "background-color": "black",
            "margin": "10px",
            "display": "flex",
        });
    }
}