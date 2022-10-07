// Generated by https://quicktype.io

export interface ProductByID {
    status:  string;
    product: ProductID;
}

export interface ProductID {
    _id:          string;
    date:         string;
    nombre:       string;
    ingredientes: string;
    sabores:      string;
    categoria:    string;
    datos:        string;
    peso:         string;
    capacidad:    string;
    precio:       string;
    image:        string;
    __v:          number;
}
