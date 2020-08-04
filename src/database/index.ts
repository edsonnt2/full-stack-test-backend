import { connect } from 'mongoose';

connect('mongodb://localhost:27017/full-stack-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected !'))
  .catch(err => console.log(err));
