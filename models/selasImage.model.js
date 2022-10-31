import {model, models } from 'mongoose';
import selasImageSchema from './selasImageSchema'


const SelasImage = models.SelasImage || model('SelasImage', selasImageSchema);

export default SelasImage;