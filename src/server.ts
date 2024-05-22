import app from './app';
import {connectDB} from '../config/db';
import {PORT} from '../config/config';

(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})();
