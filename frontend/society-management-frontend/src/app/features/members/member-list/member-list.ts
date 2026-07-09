import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Member } from '../../../core/models/member';
import { MemberService } from '../../../core/services/member';
import { MemberForm } from '../member-form/member-form';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './member-list.html',
  styleUrl: './member-list.scss',
})
export class MemberList implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'fullName',
    'email',
    'mobile',
    'wing',
    'flatNumber',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Member>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (members) => {
        this.dataSource.data = members;
      },
      error: (error) => {
        console.error('Failed to load members', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Add Member
  openDialog(): void {

    const dialogRef = this.dialog.open(MemberForm, {
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loadMembers();
      }

    });

  }

  // Edit Member
  editMember(member: Member): void {

    const dialogRef = this.dialog.open(MemberForm, {
      width: '700px',
      disableClose: true,
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loadMembers();
      }

    });

  }

}