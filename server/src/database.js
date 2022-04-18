import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/community", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

})
    .then(() => console.log("db is connected"))
    .catch(error => console.log(error))

/*process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
})*/