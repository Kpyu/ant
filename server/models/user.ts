import * as crypto from 'crypto';
import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});

// UserSchema.index({ id: 1 }, { unique: true })

UserSchema.path('password').set((v: any) => {
    return crypto.createHash('md5').update(v).digest('base64');
});


UserSchema.statics.checkPassword = async function (name: string, password: string) {

};

export default mongoose.model('user', UserSchema);
