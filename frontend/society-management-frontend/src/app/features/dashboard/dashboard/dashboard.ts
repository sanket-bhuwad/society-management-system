import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { DashboardCard } from '../../../shared/components/dashboard-card/dashboard-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar,
    Navbar,
    DashboardCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {}