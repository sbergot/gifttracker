using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace gifttracker.Migrations
{
    public partial class add_individus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Individuals");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Individuals",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Individuals",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Occurences_ReceiverId",
                table: "Occurences",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurences_Individuals_ReceiverId",
                table: "Occurences",
                column: "ReceiverId",
                principalTable: "Individuals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Occurences_Individuals_ReceiverId",
                table: "Occurences");

            migrationBuilder.DropIndex(
                name: "IX_Occurences_ReceiverId",
                table: "Occurences");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Individuals");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Individuals");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Individuals",
                nullable: true);
        }
    }
}
