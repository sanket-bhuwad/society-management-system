import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { MemberService } from '../../../core/services/member';
import { Member } from '../../../core/models/member';

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
    MatDialogModule,
  ],
  templateUrl: './member-form.html',
  styleUrl: './member-form.scss',
})
export class MemberForm {
  memberForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private dialogRef: MatDialogRef<MemberForm>,
    @Inject(MAT_DIALOG_DATA) public data: Member | null
  ) {
    this.memberForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      wing: ['', Validators.required],
      flatNumber: ['', Validators.required],
      role: ['Owner'],
      status: ['Active'],
    });

    // Edit Mode
    if (this.data) {
      this.memberForm.patchValue({
        fullName: this.data.fullName,
        email: this.data.email,
        mobile: this.data.mobile,
        wing: this.data.wing,
        flatNumber: this.data.flatNumber,
        role: this.data.role,
        status: this.data.status,
      });
    }
  }

  saveMember(): void {
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    // EDIT
    if (this.data) {
      this.memberService
        .updateMember(this.data.id!, this.memberForm.value)
        .subscribe({
          next: () => {
            alert('Member Updated Successfully ✅');
            this.dialogRef.close(true);
          },
          error: (err) => {
            alert(err.error?.message || 'Failed to Update Member');
          },
        });

      return;
    }

    // ADD
    this.memberService.createMember(this.memberForm.value).subscribe({
      next: () => {
        alert('Member Added Successfully ✅');
        this.dialogRef.close(true);
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to Add Member');
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}