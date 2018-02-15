import { Component } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Promise } from 'q'
import { error } from 'util'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prodname: string
  proddesc: string
  prodcollection: AngularFirestoreCollection<any> = this.afs.collection('products')
  prodobs = this.prodcollection.valueChanges()
  constructor(private afs: AngularFirestore) {}
  add() {
    this.prodcollection
      .add({
        prodname: this.prodname,
        proddesc: this.proddesc
      })
      .then(docref => {
        this.prodcollection.doc(docref.id).update({
          prodid: docref.id
        })
      })
      .catch(error => {
        console.log('err', error)
      })
  }
  update(product) {
    this.prodcollection
      .doc(product.prodid)
      .update({
        prodname: product.prodname,
        proddesc: product.proddesc
      })
      .then(() => {
        console.log('up')
      })
  }
  delete(product) {
    this.prodcollection
      .doc(product.prodid)
      .delete()
      .then(() => {
        console.log('deleted')
      })
  }
}
