<template>
    <div id="all-items">
        <h1>Products</h1>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Url</td>
                <td>Prize</td>
                <td>Delete</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" v-bind:key="item.id">
                    <td>{{ item.id }}</td> 
                    <td>{{ item.name }}</td>
                    <td>{{ item.url }}</td>
                    <td>{{ item.prize }}zł</td>
                    <td><button v-on:click="deleteProduct(item.id)">DELETE</button></td>
                </tr>
            </tbody>
        </table>

        

        <form 
        @submit="checkForm" 
        action="https://localhost:3000/products"
        method="post">
            

            <input id="name" v-model="name" type="text" name="name" placeholder="name">
            <input id="url" v-model="url" type="text" name="url" placeholder="url">
            <input id="prize" v-model="prize" type="number" name="prize" min='1' placeholder="prize">
            <p v-if="errors.length">
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <input type="submit" value="Dodaj nowy produkt">
        </form>
    </div>
</template>

<style>
    body {
        background: #F5F5F5;
        color: #333;
        text-align: center;
        font-family: sans-serif;
    }

    #page {
        background: #FFF;
        padding: 3rem;
    }

    #all-items {
        margin: 0 auto;
    }

    table {
        margin: 0 auto;
    }
    tr {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px dotted #333;
    }

    td {
        width: 20%;
        text-align: left;
    }

    form {
        width: 300px;
        margin: 40px auto;
        display: flex;
        flex-direction: column;

    }

    form p {
        text-align: left;
        margin-bottom: 0;
    }


    button, input[type='submit']{
        padding: 10px 30px;
        background-color: #fff;
        border: 1px solid #333;
        text-transform: uppercase;
        font-weight: bold;
        transition: .2s;
    }

    button:hover, input[type='submit']:hover{
        cursor: pointer;
        background-color: #333;
        border: 1px solid #333;
        color: white;
    }

    input[type='submit'] {
        margin-top: 20px;
    }

    input[type='text'],
    input[type='number'] {
        display: block;
        padding: 10px;
        height: 100%;
        margin-bottom: 20px;
    }

    input[type='number'] {
        margin-bottom: 0px;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    ul li {
        color: red;
        font-size: 13px;
    }

</style>

<script>

    export default{
        data(){
            return{
                items: [],
                name:null,
                url:null,
                prize:null,
                errors: [],
            }
        },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            fetchProductData: function()
            {
                this.$http.get('http://localhost:3000/products').then((response) => {
                    this.items = response.body;
                }, (response) => {
                    console.log(response);
                });
            },

            deleteProduct: function(id)
            {
                this.$http.delete('http://localhost:3000/products/' + id).then((response) => {
                    this.fetchProductData();
                }, (response) => {
                    console.log(response);
                });
            },

            checkForm: function(e) {
                e.preventDefault();
                this.errors = [];
                if(!this.name) this.errors.push("Name required.");
                if(!this.url) this.errors.push("Url required.");
                if(!this.prize) this.errors.push("Prize required.");
                if(this.name && this.url && this.prize){
                    const product = {
                        name: this.name,
                        url: this.url,
                        prize: this.prize,
                    }
                    this.$http.post('http://localhost:3000/products/', product).then((response) => {
                        this.fetchProductData();
                        alert('Produkt dodany!')
                    }, (response) => {
                        console.log(response);
                    });
                }
            }
        }
    }
</script>
