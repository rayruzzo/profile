import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
  isAdmin: boolean;
}

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;