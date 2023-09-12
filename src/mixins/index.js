export default{
    methods:{

    },
    computed:{
        url(){
            return `http://127.0.0.1:8000`
        },
        header(){
            return {
                headers: {
                    Authorization: 'Bearer ' + this.$store.state.tokens.access,
                  },
            }
        }
    }
}