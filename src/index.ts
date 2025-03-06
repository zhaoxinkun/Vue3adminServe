import AppDataSource from '../ormconfig';
import { UserEntity } from './user/user.entity';


AppDataSource.initialize().then(async () => {


    const res = await AppDataSource.manager.find(UserEntity);

    console.log('Here you can setup and run express / fastify / any other framework.', res);

}).catch(error => console.log(error));