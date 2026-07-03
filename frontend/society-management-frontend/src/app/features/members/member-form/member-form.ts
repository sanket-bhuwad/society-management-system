import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MemberService } from '../../../core/services/member';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './member-form.html',
  styleUrl: './member-form.scss'
})
export class MemberForm {

  memberForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private dialogRef: MatDialogRef<MemberForm>
  ) {

    this.memberForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      wing: ['', Validators.required],
      flatNumber: ['', Validators.required],
      role: ['Owner'],
      status: ['Active']
    });

  }

  saveMember(): void {

    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    this.memberService.createMember(this.memberForm.value).subscribe({

      next: () => {

        alert('Member Added Successfully ✅');

        this.dialogRef.close(true);

      },

      error: (err) => {

        alert(err.error?.message || 'Failed to Add Member');

      }

    });

  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}